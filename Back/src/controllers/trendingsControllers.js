import { hashtagSchema } from "../schemas/schemas.js";
import trendingsRepository from "../repositories/trendingsRepository.js";
import * as userRepository from "../repositories/userRepository.js";

async function insert(req, res) {
  try {
    const validation = hashtagSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
      return res
        .status(442)
        .send(validation.error.details.map((item) => item.message));
    }

    const thereIsHashtag = await trendingsRepository.verifyHashtag(
      validation.value.hashtag
    );

    if (thereIsHashtag.rows.length === 0) {
      await trendingsRepository.insertHashtag(validation.value.hashtag);
    } else {
      await trendingsRepository.incrementHashtag(thereIsHashtag.rows[0].id);
    }

    return res.sendStatus(200);
  } catch (e) {
    return res.status(500).send(e.messages);
  }
}

async function list(req, res) {
  try {
    const trendings = await trendingsRepository.getTrendings();
    return res.status(200).send(trendings.rows);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function filter(req, res) {
  const { hashtag } = req.params;
  const user = res.localItens;

  try {
    let filterPosts = await trendingsRepository.filterPostsByHashtag(hashtag);
    filterPosts = filterPosts.rows;

    const links = await userRepository.linksUser({ id: user.userId });

    const link2 = await userRepository.linksUser({});

    link2.map((value) => {
      delete value.createDate;
      return value;
    });

    for (let index = 0; index < filterPosts.length; index++) {
      filterPosts[index]["likeUser"] = [];
      for (let i = 0; i < links.length; i++) {
        if (filterPosts[index].id === links[i].linkId) {
          filterPosts[index]["boolean"] = true;
        }
      }

      for (let i = 0; i < link2.length; i++) {
        if (filterPosts[index].id === link2[i].id) {
          filterPosts[index].likeUser.push(link2[i].userName);
        }
      }
    }

    return res.status(200).send(filterPosts);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function relationateLinkWithHashtag(req, res) {
  const { linkId, hashtagId } = req.body;
  try {
    await trendingsRepository.relationateLinkWithHashtag(linkId, hashtagId);
    return res.sendStatus(200);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function getHashtagId(req, res) {
  const { hashtag } = req.params;

  try {
    const data = await trendingsRepository.getHashtagId(hashtag);

    return res.status(200).send(data);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

export { insert, list, filter, relationateLinkWithHashtag, getHashtagId };

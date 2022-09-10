import PostModel from "../models/Post.js";

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();
    const tags = posts
      .map((item) => item.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось получить статьи" });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось получить статьи" });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      { $inc: { viewsCount: 1 } },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          return res.status(500).json({
            message: "Не удалось вернуть статью",
          });
        }

        if (!doc) {
          return res.status(404).json({ message: "Статья не найденa" });
        }

        res.json(doc);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось получить статью" });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.findOneAndDelete({ _id: postId }, (err, doc) => {
      if (err) {
        return res.status(500).json({
          message: "Не удалось удалить статью",
        });
      }

      if (!doc) {
        return res.status(404).json({
          message: "Статья не найдена",
        });
      }
    });

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось ужалить статью" });
  }
};

export const create = async (req, res) => {
  try {
    const { title, text, tags, imageUrl } = req.body;

    const doc = new PostModel({
      title,
      text,
      tags,
      imageUrl,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось создать статью" });
  }
};

export const update = async (req, res) => {
  try {
    const { title, text, tags, imageUrl } = req.body;
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title,
        text,
        tags,
        imageUrl,
        user: req.userId,
      }
    );

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(505).json({
      message: "Не удалось обновить",
    });
  }
};

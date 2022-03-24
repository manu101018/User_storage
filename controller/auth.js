exports.getLogin = (req, res, next) => {
  res
    .status(200)
    .json({
      message: "Hello from Manjeet Singh",
      title: "Logged In",
      content: "You have Logged In",
    });
};

exports.postLogin = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const message = req.body.message;
  res.status(201).json({
    _id: new Date().getHours().toString(),
    message: message,
    title: title,
    content: content,
  });
};

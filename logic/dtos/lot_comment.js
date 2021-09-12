module.exports = class LotCommentDto {
  content;
  created_at;
  updated_at;

  constructor(model) {
    this.content = model.content;
    this.created_at = model.created_at;
    this.updated_at = model.updated_at;
  }
};
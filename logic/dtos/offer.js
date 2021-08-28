module.exports = class OfferDto {
  title;
  description;
  created_at;

  constructor(model) {
    this.title = model.title;
    this.description = model.description;
    this.created_at = model.created_at;
  }
};

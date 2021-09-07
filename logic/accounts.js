const { User } = require("../models");
const UserDto = require("./dtos/user");
const Oauth = require("./oauth.js");

const list_users = async () => {
  return await User.findAll();
};

const get_user = async (id) => {
  return await User.findByPk(id).then((d) => ({ ...new UserDto(d) }));
};

const get_user_by = async (attrs) => {
  return await User.findOne({ where: { username: attrs.username } }).then(
    (d) => ({
      ...new UserDto(d),
    })
  );
};
const create_user = async (attrs) => {
  const user = await User.create(attrs).then((d) => ({ ...new UserDto(d) }));
  const tokens = await Oauth.create_token(user);

  return { user, ...tokens };
};
const authentication = async (attrs) => {
  const user = await get_user_by(attrs);
  const tokens = await Oauth.create_token(user);

  return { user, ...tokens };
};

const refresh_session = async (refresh_token) => {
  const user_id = await Oauth.refresh_token(refresh_token);
  const user = await get_user(user_id).then((d) => ({ ...new UserDto(d) }));
  const tokens = await Oauth.create_token(user);

  return { user, ...tokens };
};

const logout = async (refresh_token) => {
  await Oauth.remove_refresh_token(refresh_token);

  return;
};

const get_all_lots = async (user_id) => {
  const list_lots = await User.findOne({
    where: { id: user_id },
    attributes: ["id", "email", "first_name", "last_name"],
    include: ["lots"],
  });

  return list_lots;
};

module.exports = {
  list_users,
  get_user,
  get_user_by,
  create_user,
  authentication,
  refresh_session,
  logout,
  get_all_lots,
};

import * as bcrypt from 'bcrypt';
const saltRounds = 10;
/**
 *  将密码加工为hash密码
 *  saltRounds: salt的时长，增加密码破解难度
 * @param {string} password 原始密码
 * @return 返回加密成功的密码串
 */
const getHashPassword = async (password) => await bcrypt.hash(password, saltRounds);

/**
 * 校验密码
 *
 * @param {string} password 明文密码
 * @param {string} hashPassword hash密码
 */
const compareHashPassword = async (password, hashPassword) => await bcrypt.compare(password, hashPassword); // eslint-disable-line max-len

export {
  getHashPassword,
  compareHashPassword
};

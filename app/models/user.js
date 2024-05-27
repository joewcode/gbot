import { DataTypes, Model } from 'sequelize'
import sequelize from '../sequelize.js'
import Redis from '../redis.js'

class User extends Model {
  static async getUserOrCreate(from) {
    const user = await Redis.redis.get('user_'+from.id)
    if ( user ) {
      await Redis.redis.set('user_'+from.id, user, {EX: 60*15})
      return JSON.parse(user)
    }
    const userDB = await this.findOne({ where: { id: from.id }, attributes: ['id', 'privilege'] })
    if ( !userDB ) {
      await User.create({...from})
    }
    const data = {...from, 'privilege': userDB.privilege ?? 0 }
    await Redis.redis.set('user_'+from.id, JSON.stringify(data), {EX: 60*15})
    return data
  }
}

const model = User.init({
  id: { type: DataTypes.BIGINT, primaryKey: true, allowNull: false },
  is_bot: { type: DataTypes.BOOLEAN, defaultValue: false },
  first_name: { type: DataTypes.STRING, defaultValue: "" },
  language_code: { type: DataTypes.STRING(5), allowNull: true },
  privilege:{ type: DataTypes.BIGINT, defaultValue: 0 },
}, {
  sequelize,
  modelName: 'User'
})

export default model

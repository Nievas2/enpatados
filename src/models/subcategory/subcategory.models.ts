import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize'
import { sequelize } from '../../db/dbInstance'

class Subcategory extends Model<InferAttributes<Subcategory>, InferCreationAttributes<Subcategory>> {
    id!: CreationOptional<number>
    title!: string
    categoryId!: number
}

Subcategory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: true,
        tableName: 'Subcategories',
        sequelize
    }
)

export default Subcategory

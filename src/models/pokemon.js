const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']


module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Le nom est deja pris.' },
      validate: {
        notEmpty: { msg: 'Le nom ne peut pas être vide.' },
        notNull: { msg: 'Le nom est une propriété requise' },
        len: {
          args: [1, 25],
          msg: 'Le nombre de characteres doit être compris entre 1 et 25'
        }
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de vie.' },
        notNull: { msg: 'Les points de vie sont une propriété requise.' },
        min: {
          args: [0],
          msg: 'Le nombre minimum est de 0 hp'
        },
        max: {
          args: [999],
          msg: 'Le nombre maximum est de 999 hp'
        }
      }
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de dégats.' },
        notNull: { msg: 'Les points de dégats sont une propriété requise.' },
        min: {
          args: [0],
          msg: 'Le nombre minimum est de 0 cp'
        },
        max: {
          args: [99],
          msg: 'Le nombre maximum est de 99 cp'
        }
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: { msg: 'Utilisez uniquement une URL valide.' },
        notNull: { msg: 'Une image est requise' }
      }
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('types').split(',')
      },
      set(types) {
        this.setDataValue('types' , types.join())
      },
      validate: {
        isTypesValid(value) {
          if(!value) {
            throw new Error('Un pokemon doit avoir au moins un type.')
          }
          if(value.split(',').length > 3) {
            throw new Error('Un pokemon ne peux pas avoir plus de trois types.')
          }
          value.split(',').forEach(type => {
            if(!validTypes.includes(type)) {
              throw new Error(`Le type d'un pokemon doit appartenir à la liste suivante : ${validTypes}`)
            }
          });
        }
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}
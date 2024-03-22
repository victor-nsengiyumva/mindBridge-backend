

module.exports = (sequelise_instance, Sequelize) => {
    ProfilePic = sequelise_instance.define("profilePics", {
        pic_ID: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        doctorID: {
            type: Sequelize.UUID,
            references: {
              model: Doctor,
              key: 'doc_ID',
            },
          },
        pic_locator:{
            type:Sequelize.STRING
        }
    });

    return ProfilePic;
}
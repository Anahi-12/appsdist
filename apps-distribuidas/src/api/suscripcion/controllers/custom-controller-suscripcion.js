const { createCoreController } = require("@strapi/strapi").factories
const modelUid = "api::suscripcion.suscripcion";

module.exports = createCoreController(modelUid, ({strapi}) => ({
    async paid(ctx){
        //ctx.state.user
        let idSuscripcion = ctx.params["suscripcionId"]
        let idUser = ctx.state.user.id;

        let dataSus = await strapi.entityService.findMany('api::suscripcion.suscripcion', {
            populate: '*',
            filters: {
                id: idSuscripcion
            }
        });

        let users = dataSus[0].users;
        users.push(idUser);

       let entry = await strapi.entityService.update('api::suscripcion.suscripcion', idSuscripcion, {
            data: {
                users: users
            }
        });

        ctx.send(204)
    },
    async own(ctx){
        let idUser = ctx.state.user.id;
        let data = await strapi.entityService.findMany("api::suscripcion.suscripcion", {
            populate: '*',
            fields: ['id', 'costo', 'plan'],
            filters: {
                $and: {
                    "user": {
                        id: idUser
                    }
                }
            }
        });

        data[0]['users'] = []
        data[0]['createdBy'] = '',
        data[0]['updatedBy'] = '';
        ctx.send(data[0]);
    }
}))
const koaStatic = require("koa-static");
const { defaultsDeep } = require("lodash/fp");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const defaults = {
    maxAge:60000,
    defaultIndex:true,
};

module.exports = (plugin, config) => {
    const {defaultIndex, maxAge } = defaultsDeep(defaults, config);
    strapi.server.routes([{
        method: "GET",
        path: "/uploads/(.*)",
        handler: koaStatic(strapi.dirs.static.public, {
            maxage: maxAge,
            defer: true,
        }),
        config: {
            auth: false,
            policies: [
                async (policyContext, config, {strapi}) => {
                    console.log(policyContext);
                    if(policyContext.request.header.authorization){
                        let token = policyContext.request.header.authorization.split(' ')[1];
                        console.log(process.env.JWT_SECRET);
                        try{
                            jwt.verify(token, process.env.JWT_SECRET);
                            return true;
                        }
                        catch(error){
                            console.log(error);
                            console.error("Error verifying token");
                            return false;
                        }
                    }
                    else {
                        return false;
                    }
                }
            ]
        }
    }])
    return plugin;
};
"use strict"

module.exports = {
    routes: [
        {
            method: "POST",
            path: "/suscripcions/paid/:suscripcionId",
            handler: "custom-controller-suscripcion.paid",
            config: {
                policies: []
            }
        },
        {
            method: "GET",
            path: "/suscripcions/own",
            handler: "custom-controller-suscripcion.own",
            config: {
                policies: []
            }
        }
    ]
}
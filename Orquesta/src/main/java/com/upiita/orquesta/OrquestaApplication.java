package com.upiita.orquesta;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;

@SpringBootApplication
public class OrquestaApplication {

	private static final String URL = "http://localhost:8081";

	public static void main(String[] args) {
		SpringApplication.run(OrquestaApplication.class, args);
	}
	
	@Bean
	public RouteLocator myRoutes(RouteLocatorBuilder builder){
		return builder.routes()
		.route(p-> p
			.path("/api/auth/local")
			.uri(URL))
		.route(p-> p
			.path("/api/auth/local/register")
			.uri(URL))
		.route(p->p
			.path("/api/contenidos")
			.uri(URL))
		.route(p->p
			.path("/api/users/me")
			.uri(URL))
		.route(p->p
			.path("/api/contenidos/**")
			.filters(rw -> rw.rewritePath("/api/contenidos/(?<segment>.*)", "/api/contenidos/${segment}"))
			.uri(URL)
			)
		.route(p->p
			.path("/api/contenidos**")
			.filters(rw -> rw.rewritePath("/api/contenidos(?<segment>.*)", "/api/contenidos${segment}"))
			.uri(URL)
			)
		
		.route(p->p
			.path("/api/suscripcions/**")
			.filters(rw -> rw.rewritePath("/api/suscripcions/(?<segment>.*)", "/api/suscripcions/${segment}"))
			.uri(URL)
			)
		.route(p->p
			.path("/api/suscripcions")
			.filters(rw -> rw.rewritePath("/api/suscripcions(?<segment>.*)", "/api/suscripcions${segment}"))
			.uri(URL)
			)
		.route(p->p
			.path("/api/suscripcions/paid/**")
			.filters(rw -> rw.rewritePath("/api/suscripcions/paid/(?<segment>.*)", "/api/suscripcions/paid/${segment}"))
			.uri(URL)
			)
		.route(p->p
			.path("/api/suscripcions/own")
			.filters(rw -> rw.rewritePath("/api/suscripcions/own", "/api/suscripcions/own"))
			.uri(URL)
			)
		.route(p->p
			.path("/api/upload/files")
			.uri(URL)
			)
		.build();
	}
	

}

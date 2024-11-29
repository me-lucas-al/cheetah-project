package bra.ifsp.edu.br.cheetah.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {  
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        System.out.println("Configuração de CORS sendo aplicada...");

        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedHeaders("*")
                .allowedMethods("*");

        System.out.println("CORS configurado para permitir: http://localhost:5173");
    }
}



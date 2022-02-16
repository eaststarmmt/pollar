package com.ssafy.pollar.configuration;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.util.Arrays;
import java.util.List;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer{ // web 설정 파일

//    @Value("${file.path}")
//    private String uploadFolder;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        WebMvcConfigurer.super.addResourceHandlers(registry);

        //file:///C:/workspace/springbootwork/upload/
        registry
                .addResourceHandler("/upload/**")
//                .addResourceLocations("file:/"+uploadFolder)
                .addResourceLocations("classpath:/upload/")
                .setCachePeriod(60*10*6) // 1시간 이미지 캐싱
                .resourceChain(true)
                .addResolver(new PathResourceResolver());
    }
    // Cors 모든 도메인 승인
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*");
    }
}

package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class Application {

//    @Bean
//    public BCryptPasswordEncoder bCryptPasswordEncoder() {
//        return new BCryptPasswordEncoder();
//    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

//    @Bean
//    CommandLineRunner initUser(UserDao userDao, BCryptPasswordEncoder passwordEncoder){
//        return args -> {
//            userDao.deleteAll();
//            User user = new User("Devglan", "Devglan", "devglan", passwordEncoder.encode("devglan"), 12345, 34);
//            userDao.save(user);
//        };
//    }

//    @Bean
//    CommandLineRunner initUser(DeliverDao deliverDao) {
//        return args -> {
//            Deliver deliver = new Deliver(1,2, 2, 3, 400);
//            deliverDao.save(deliver);
//        };
//    }

}
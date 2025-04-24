package com.sjd.luckyou.config.jpa;

//@Configuration
//@EnableTransactionManagement
//@EnableJpaRepositories(
//        basePackages = "com.sjd.demo.repository",
//        entityManagerFactoryRef = "entityManagerFactory",
//        transactionManagerRef = "jpaTransactionManager"
//)
public class JpaConfig {

//    @Bean
//    public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource dataSource) {
//        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
//        em.setDataSource(dataSource);
//        em.setJpaVendorAdapter(jpaVendorAdapter());
//        em.setPackagesToScan("com.sjd.demo.entity");
//
//        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
//        vendorAdapter.setGenerateDdl(true);
//        em.setJpaVendorAdapter(vendorAdapter);
//
//        Map<String, Object> jpaProperties = new HashMap<String, Object>();
//        jpaProperties.put("hibernate.show_sql", "false");
//        jpaProperties.put("hibernate.format_sql", "true");
//        jpaProperties.put("hibernate.use_sql_comments", "false");
//        jpaProperties.put("hibernate.generate_statistics", "false");
//        jpaProperties.put("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");
//        jpaProperties.put("hibernate.hbm2ddl.auto", "none"); // update | none
//        jpaProperties.put("hibernate.implicit_naming_strategy", "org.springframework.boot.orm.jpa.hibernate.SpringImplicitNamingStrategy");
//        jpaProperties.put("hibernate.physical_naming_strategy", "com.sjd.demo.config.jpa.SnakeCaseNamingStrategy"); // 스네이크 케이스 전략
//
//        em.setJpaPropertyMap(jpaProperties);
//
//        return em;
//    }
//
//    @Bean(name = "jpaTransactionManager")
//    @Primary
//    public PlatformTransactionManager jpaTransactionManager(EntityManagerFactory entityManagerFactory) {
//        JpaTransactionManager transactionManager = new JpaTransactionManager();
//        transactionManager.setEntityManagerFactory(entityManagerFactory);
//        return transactionManager;
//    }
//
//    @Bean
//    public JpaVendorAdapter jpaVendorAdapter() {
//        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
//        vendorAdapter.setGenerateDdl(true);  // DDL 자동 생성 여부
//        vendorAdapter.setShowSql(true);  // SQL 쿼리 출력 여부
//        return vendorAdapter;
//    }
}

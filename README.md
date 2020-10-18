## 码匠社区

## 资料
[Spring文档](https://spring.io/guides)  
[Spring Web](https://spring.io/guides/gs/serving-web-content)  
[es](https://elasticsearch.cn/explore)  
[Github deploy key](https://docs.github.com/en/free-pro-team@latest/developers/overview/managing-deploy-keys#deploy-key)  
[Bootstrap](https://v3.bootcss.com/getting-started/)  
[Github OAuth](https://developer.github.com/apps/building-oauth-apps/)  
[Spring文档](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)  
[MyBatis-Spring-Boot](https://mybatis.org/spring-boot-starter/mybatis-spring-boot-autoconfigure/)
## 工具
[Git](https:git-scm.com/download)  
[Visual Paradigm](https://www.visual-paradigm.com/)
[Flyway](https://flywaydb.org/documentation/getstarted/firststeps/maven)  
[Lombol](https://projectlombok.org/)

## 脚本
```sql
create table USER
(
	ID INT auto_increment,
	ACCOUNT_ID VARCHAR(100),
	NAME VARCHAR(50),
	TOKEN CHAR(36),
	GMT_CREATE BIGINT,
	GMT_MODIFIED BIGINT,
		primary key (ID)
);
```
```bash
mvn flyway:migration
```

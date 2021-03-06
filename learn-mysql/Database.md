# 데이터베이스

관련성을 가지며 중복이 없는 데이터들의 집합이다.

# DBMS(DataBase Management System)

데이터베이스를 관리하는 시스템

데이터베이스는 보통 서버 종료 여부와 상관없이 데이터를 지속적으로 사용할 수 있다.
여러사람이 동시에 사용도 할 수 있는데 사람들에게 각 각 다른 권한을 줘서 어떤사람은 읽기만 가능하고,
어떤사람은 모든 작업을 가능하게 할 수 있다.

# RDBMS(Relational DBMS)

관계형 DBMS가 많이 사용되며 예시로는 Oracle, MySQL, MSSQL등이 있다.
이들은 SQL이라는언어를 사용해서 데이터를 관리한다.
RDBMS별로 SQL문이 조금씩 다르다.

## SCHEMA

- mysql에서는 CREATE SCHEME [DB name] 과 같이 데이터베이스를 생성할 수 있는데 SCHEMA라는 것이 DB와 같은의미로 사용됨
- ex) CREATE SCHEMA sanghunlee DEFAULT CHARACTER SET utf8;
- DEFAULT CHARACTER SET utf8; 을 붙여 한글을 사용할 수 있게 만들어 준다

## ORM(Object-Relational-Mapping)

ORM은 자바스크립트 객체와 데이터베이스의 릴레이션을 매핑해주는 도구이다.

### 시퀄라이즈(Sequelize)

- 시퀄라이즈가 이에 해당하며 시퀄라이즈는 MYSQL작업을 쉽게할 수 있도록 도와주는 라이브러리중 하나이다.
- SQL언어를 직접 사용하지 않아도 자바스크립트 만으로 MYSQL을 조작할 수 있고, SQL을 몰라도 MYSQL을 어느 정도 다룰 수 있게 된다.

## 관계 정의

- 1:N 관계(일대다)
  사용자 한명은 댓글을 여러개 작성할 수 있다. 그러나 댓글하나에 작성자가 여러명일 수 없다 이러한 경우가 1:N관계라고 한다.
- 1:1 관계(일대일)
  사용자와 사용자에 대한 정보 테이블을 예로들 수 있다. 사용자 한명은 자신의 정보를 담고 있는 테이블과만 관계가 있고 정보를 담고 있는 테이블 또한 그 사용자(한사람)만을 가리킨다.
- N:M관계(다대다)
  해시태그와 게시글 테이블관계를 예로들 수 있다. 한 게시글에는 여러개의 해시태그가 달릴 수 있고 한 해시태그도 여러 게시글에 달릴 수 있다.
- MySQL에서는 JOIN이라는 기능을 통해 테이블간의 관계를 파악해 결과를 도출한다.(시퀄라이즈에서는 이에 해당하는 메서드를 지원해준다.)

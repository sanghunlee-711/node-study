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

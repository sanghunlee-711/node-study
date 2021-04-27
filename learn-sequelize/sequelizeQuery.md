# 쿼리문법

<hr>

- SQL

  1. INSERT INTO nodejs.users (name, age, married, comment) VALUES ('hun',28,0,"자기소개1");

  2. SELECT \* FROM nodejs.users;

  3. SELECT \* FROM nodejs.users LIMIT 1;

  4. SELECT name, married FROM nodejs.users;

  5. SELECT name, age FROM nodejs.users WHERE married = 1 AND age > 30;

  6. SELECT id, name FROM nodejs.users WHERE married = 0 OR age > 30;

  7. SELECT id, name, FROM users ORDER BY age DESC;

  8. SELECT id, name FROM users ORDER BY age DESC LIMIT 1;

  9. SELECT id, name FROM users ORDER BY age DESC LIMIT 1 OFFSET1;

  10. UPDATE nodejs.users SET comment = '바꿀내용' WHERE id = 2;

  11. DELETE FROM nodejs.users WHERE id = 2;

- Sequelize

  1. const {User} = require("../models");
     User.create({
     name:"hun",
     age:28,
     married:false,
     comment:"자기소개1",
     });

  2. user.findAll({});

  3. user.findOne({});

  4. user.findAll({
     attirbutes:['name','married'];
     });

  5. const {Op} = require('sequelize');
     const {User} = require('../models');
     User.findAll({
     attirbutes: ['name','age'],
     where: {
     married: 1,
     age: {[Op.gt]: 30}
     }
     });

  6. const {Op} = require('sequelize');
     const {User} = require('../models');
     User.findAll({
     attirbutes: ['id','name'],
     where: {
     [Op.or]:[{married: 0},{age: {[Op.gt]: 30}}]
     }
     });

  7. User.findAll({
     attributes: ['id','name'],
     order:[['age','DESC']]
     });

  8. User.findAll({
     attributes: ['id','name'],
     order:[['age','DESC']],
     limit: 1,
     });

  9. User.findAll({
     attributes: ['id','name'],
     order: [['age','DESC']],
     limit: 1,
     offset: 1,
     })

  10. User.update({
      comment: '바꿀 내용',
      },{
      where: {id:2},
      })
  11. User.destroy({
  where: {id:2}
  })
  <hr>

- 위 두개를 비교하면 알 수 있듯이 model을 정의한 models 모듈을 통해 User모델을 불러와 create 메서드를 사용해 새로운 데이터를 넣는다
- 모든테이블을 조회하기 위해서는 findAll 메서드를 사용하면 된다
- User테이블에서 데이터 하나만 가져오는 SQL문을 보면 sequelize에서는 findOne메서드를 통해 가져오는 것을 볼 수 있다.
- 4.를 보면 attributes를 사용하여 원하는 컬럼만 값을 가져올 수 있다.
- 5.6 의 경우 Sequelize객체 내부의 Op객체를 불러와 사용하는 것을 볼 수 있으며 옵션은 Op.gt(초과), Op.lte(이하) Op.or(또는) 등이 존재한다.
- 7 을 보면 배열안에 배열이 존재하는데 컬럼하나로만 정렬하지 않기 때문에 이러한 문법이 존재한다.
- 8,9를 보면 offset limit 옵션 설정을 하여 로우 개수를 설정할 수 있다.
- 10을 통해 로우를 수정하는 쿼리를 볼 수 있다.<br>
  update메서드로 수정할 수 있으며 첫번째 인수는 수정할 내용, 두번째 인수는 어떤 로우를 수정할 지에 대한 조건을 나타낸다.
- 11을 보면 destroy 옵션을 통해 DELETE 쿼리문과 같이 삭제 기능을 구현할 수 있으며,<br>
  where을 통해 옵션에 조건들을 적는다

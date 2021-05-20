const localStrategy = require("passport-local").Strategy;
const { User } = require('../models');

module.exports = passport => {
  passport.use(
    new localStrategy(
      {
        usernameField: "id",   
        passwordField: "password",
      },
      (id, pw, done) => {    

        const user =  User.findOne({where : {userID : id }})
            .then(result => {
              console.log('in localStrategy');
              console.log(id, pw);
                const comparePassword = result.password === pw ? true : false;
                if(comparePassword){
                    console.log('localStrategy에서 id, pw 조회 성공');
                    done(null, result, { message : '로그인 정보 일치!'})
                }else {
                    done(null, false, { message: '로그인 정보가 일치하지 않습니다' });
                }
            })
      }
    )
  );
};
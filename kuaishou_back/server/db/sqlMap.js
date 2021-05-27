var sqlMap = {
    user: {
        add: 'insert into user (userID, password, avatarUrl, nickname, age, email, introduction) values (?,?,?,?,?,?,?)',
        select_userID: 'select * from user', 
        update_user: 'update user set'
    },
    
    video: {
        add: 'insert into video (userID, videoID, videoUrl, videoTitle, videoSort, videoDesc) values (?,?,?,?,?,?)',
        select_allVideo: 'select * from video',
    }
}

module.exports = sqlMap;

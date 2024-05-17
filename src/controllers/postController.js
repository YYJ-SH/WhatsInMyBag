const connection = require('../main').connection; // main.js 파일에서 데이터베이스 연결 객체 가져오기

// 게시물 목록 조회
exports.getAllPosts = async (req, res) => {
    try {
        const db = await connection();
        const [rows] = await db.query('SELECT * FROM posts');
        res.render('posts', { posts: rows });
    } catch (error) {
        console.error("게시물 목록 조회 오류:", error);
        res.render('error');
    }
};

// 게시물 상세 조회
exports.getPostById = async (req, res) => {
    const postId = req.params.id;
    try {
        const db = await connection();
        const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [postId]);
        if (rows.length === 0) {
            res.status(404).render('not-found');
        } else {
            res.render('post', { post: rows[0] });
        }
    } catch (error) {
        console.error("게시물 상세 조회 오류:", error);
        res.render('error');
    }
};

// 게시물 생성
exports.createPost = async (req, res) => {
    const { title, content, author } = req.body;
    try {
        const db = await connection();
        await db.query('INSERT INTO posts (title, content, author) VALUES (?, ?, ?)', [title, content, author]);
        res.redirect('/');
    } catch (error) {
        console.error("게시물 생성 오류:", error);
        res.render('error');
    }
};

// 게시물 수정
exports.updatePost = async (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;
    try {
        const db = await connection();
        await db.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, postId]);
        res.redirect('/');
    } catch (error) {
        console.error("게시물 수정 오류:", error);
        res.render('error');
    }
};

// 게시물 삭제
exports.deletePost = async (req, res) => {
    const postId = req.params.id;
    try {
        const db = await connection();
        await db.query('DELETE FROM posts WHERE id = ?', [postId]);
        res.redirect('/');
    } catch (error) {
        console.error("게시물 삭제 오류:", error);
        res.render('error');
    }
};

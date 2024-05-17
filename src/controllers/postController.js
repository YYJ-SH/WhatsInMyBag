// src/controllers/postController.js
const Post = require('../models/Post'); // Sequelize 모델을 사용
const connect = require('../../config/databaseConnector'); // MySQL2 연결 함수

// 게시물 목록 조회
exports.getAllPosts = async (req, res) => {
    try {
        const connection = await connect(); // connect() 함수 호출
        const [rows] = await connection.query('SELECT * FROM posts');
        res.render('posts', { posts: rows });
        await connection.end(); // 연결 종료
    } catch (error) {
        console.error("게시물 목록 조회 오류:", error);
        res.render('error');
    }
};

// 게시물 상세 조회
exports.getPostById = async (req, res) => {
    const postId = req.params.id;
    try {
        const connection = await connect();
        const [rows] = await connection.query('SELECT * FROM posts WHERE id = ?', [postId]);
        if (rows.length === 0) {
            res.status(404).render('not-found');
        } else {
            res.render('post', { post: rows[0] });
        }
        await connection.end();
    } catch (error) {
        console.error("게시물 상세 조회 오류:", error);
        res.render('error');
    }
};

// 게시물 생성
exports.createPost = async (req, res) => {
    const { title, content, author } = req.body;
    try {
        const connection = await connect();
        await connection.query('INSERT INTO posts (title, content, author) VALUES (?, ?, ?)', [title, content, author]);
        res.redirect('/');
        await connection.end();
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
        const connection = await connect();
        await connection.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, postId]);
        res.redirect('/');
        await connection.end();
    } catch (error) {
        console.error("게시물 수정 오류:", error);
        res.render('error');
    }
};

// 게시물 삭제
exports.deletePost = async (req, res) => {
    const postId = req.params.id;
    try {
        const connection = await connect();
        await connection.query('DELETE FROM posts WHERE id = ?', [postId]);
        res.redirect('/');
        await connection.end();
    } catch (error) {
        console.error("게시물 삭제 오류:", error);
        res.render('error');
    }
};

// 추가 예제
exports.showPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.render('post', { post });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

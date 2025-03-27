SELECT
           f.id AS _id,
           f.parent_id,
           JSON_OBJECT(
             '_id', u.id,
             'name', u.username,
             'role', u.role,
             'gender', u.gender,
             'avatar', u.avatar
           ) AS author,
             f.content,
             UNIX_TIMESTAMP(f.created_at) AS created_at,
             f.is_spam,
             NULL AS mention_id,
             NULL AS mention_user,
             f.movie_slug,
             CASE WHEN f.type = 'review' THEN f.id ELSE NULL END AS reviews_id,
             CASE WHEN f.type = 'review' THEN JSON_OBJECT('point', f.point) ELSE NULL END AS reviews,
             (SELECT COUNT(*) FROM feedbacks AS c WHERE c.parent_id = f.id) AS total_children,
             (SELECT COUNT(*) FROM feedback_vote WHERE feedback_id = f.id AND type = 'dislike') AS total_dislike,
             (SELECT COUNT(*) FROM feedback_vote WHERE feedback_id = f.id AND type = 'like') AS total_like
           FROM
               feedbacks AS f
           JOIN
               users AS u ON f.user_id = u.id
           WHERE
               f.movie_slug = ? AND f.type = ? AND f.parent_id is NULL ${conditionQuery}
           ORDER BY f.created_at DESC
           LIMIT ?
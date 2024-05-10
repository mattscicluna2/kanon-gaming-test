SELECT *
FROM players
WHERE id IN (
    SELECT player_id
    FROM player_favourite_games
    WHERE game_id IN (
        SELECT id
        FROM games
        WHERE type_id IN (
            SELECT id
            FROM game_types
            WHERE name = 'SLOT'
            )
        )
    )
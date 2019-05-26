# usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true, unique: true|
|mail|string|null: false|
|passward|string|null: false|

- Association
has_many :members
has_many :group, through: :members

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|

- Association
belongs_to :user<br>

#### messageテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|
|users_id|integer|null: false, foreign_key|
|group_id|integer|null: false, foreign_key|

- Association
has_many :members
has_many :group, through: :members

#### membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

- Association
belongs_to :group<br>
belongs_to :user<br>
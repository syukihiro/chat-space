# usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true, unique: true|
|mail|string|null: false|
|passward|string|null: false|

- Association
has_many :members
has_many :group, through: :members
has_many :messages

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|

- Association
has_many :members
has_many :users, through: :members
has_many :messages

#### messageテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|users_id|integer|null: false, foreign_key|
|group_id|integer|null: false, foreign_key|

- Association
belongs_to :group  
belongs_to :user  

#### membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

- Association
belongs_to :group  
belongs_to :user  
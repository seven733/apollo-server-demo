#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# 生成基本的随机数据

import pymongo
from random import choice
from bson.objectid import ObjectId
from mimesis import Person
from mimesis import Text
from mimesis import Numbers
from mimesis import Development
from mimesis import locales

client = pymongo.MongoClient('localhost', 27017)
db = client['graphql']

def update():
    db.users.remove({})
    db.goods.remove({})
    users, goods = [], []
    for _ in range(30):
    person = Person(locales.ZH)
        user = {
            "name": person.name(),
            "age": person.age(),
            "sex": choice(["boy", "girl"]),
            "mobile": person.telephone(),
            "wechat": person.email(),
            "status": choice(["normal", "in_debt"]),
            "isVip": Development().boolean(),
        }
        users.append(user)
    db.users.insert_many(users)

if __name__ == '__main__':
    update()



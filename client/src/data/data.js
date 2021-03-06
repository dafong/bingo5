
let get_handler = function(mapping,data){
    return {
        get : function(target,name){
            return data[mapping[name]]
        },
        set : function(obj,prop,val){
            throw new TypeError("can't modify config data");
        }

    }
}

let general_mapping = {
    gid : 0,
    name: 1,
    country:2,
    rarity:3,
    hp:4,
    atk:5,
    lead:6,
    wit:7,
    relation:8,
    discover:9
}

export const  general_data = {
    data : {
        //general_replace_begin
1101 : [1101,'刘备',1,1,443,73,75,74,'1102|4|20;1201|3|20;1202|2|20;2101|1|20;',1],
1102 : [1102,'诸葛亮',1,1,488,38,92,100,'1101|3|20;1209|4|20;1212|1|20;3201|4|20;',1],
1201 : [1201,'关羽',1,2,432,97,95,75,'1101|3|20;1202|2|20;1203|2|20;2101|1|20;',1],
1202 : [1202,'张飞',1,2,412,98,85,30,'1101|3|20;1201|1|20;1204|2|20;1205|2|20;',1],
1203 : [1203,'赵云',1,2,421,96,91,76,'1101|3|20;1201|2|20;1102|4|20;1202|2|20;',1],
1204 : [1204,'马超',1,2,416,97,88,44,'1101|3|20;1203|3|20;1205|2|20;2202|1|20;',1],
1205 : [1205,'黄忠',1,2,403,93,86,60,'1101|3|20;1203|2|20;1204|1|20;1102|4|20;',1],
1206 : [1206,'蒋琬',1,2,398,34,78,84,'1208|1|20;1207|1|20;1213|3|20;1102|4|20;',1],
1207 : [1207,'费祎',1,2,394,30,77,83,'1206|1|20;1208|1|20;1214|3|20;1102|4|20;',1],
1208 : [1208,'董允',1,2,383,28,47,78,'1102|4|20;1206|1|20;1207|1|20;1214|3|20;',1],
1209 : [1209,'庞统',1,2,410,34,78,97,'1102|4|20;1101|3|20;3101|1|20;1212|1|20;',1],
1210 : [1210,'黄月英',1,2,394,31,51,88,'1102|4|20;2218|1|20;1218|3|20;',1],
1211 : [1211,'法正',1,2,396,47,82,94,'1102|4|20;1101|1|20;1202|2|20;1201|3|20;',1],
1212 : [1212,'徐庶',1,2,398,64,84,93,'1101|3|20;1209|4|20;2101|1|20;1102|4|20;',1],
1213 : [1213,'姜维',1,2,405,89,90,90,'1102|4|20;1203|3|20;1214|2|20;1101|1|20;',1],
1214 : [1214,'魏延',1,2,389,92,81,69,'1102|3|20;1213|2|20;1207|1|20;',1],
1215 : [1215,'廖化',1,2,335,76,73,64,'1201|2|20;1213|3|20;1206|1|20;',1],
1216 : [1216,'关兴',1,2,365,86,76,62,'1201|1|20;1217|2|20;1301|2|20;',1],
1217 : [1217,'张苞',1,2,365,87,75,48,'1202|1|20;1216|2|20;1213|3|20;',1],
1218 : [1218,'马云禄',1,2,374,88,78,53,'1204|2|20;1203|1|20;1210|3|20;',1],
1301 : [1301,'关索',1,3,324,88,74,52,'1216|2|20;1302|1|20;1201|1|20;',1],
1302 : [1302,'关平',1,3,318,82,77,68,'1216|2|20;1301|1|20;1201|1|20;',1],
1303 : [1303,'严颜',1,3,324,83,79,69,'1205|1|20;1202|2|20;4302|1|20;',1],
2101 : [2101,'曹操',2,1,480,72,96,91,'2102|4|20;2201|2|20;2202|3|20;3101|1|20;',1],
2102 : [2102,'司马懿',2,1,485,63,98,96,'2101|1|20;2216|3|20;2204|3|20;1102|4|20;',1],
2201 : [2201,'典韦',2,2,344,95,56,35,'2101|1|20;2202|2|20;2213|3|20;2205|2|20;',1],
2202 : [2202,'许褚',2,2,362,96,65,36,'2101|3|20;2201|2|20;1204|1|20;2205|2|20;',1],
2203 : [2203,'张辽',2,2,416,92,93,78,'2207|2|20;2204|3|20;4102|2|20;1201|1|20;',1],
2204 : [2204,'张郃',2,2,403,89,90,69,'2205|2|20;2206|2|20;2214|3|20;4202|1|20;',1],
2205 : [2205,'乐进',2,2,369,84,80,52,'2203|3|20;2207|2|20;2202|2|20;',1],
2206 : [2206,'于禁',2,2,365,78,84,70,'2203|1|20;2205|2|20;2101|3|20;',1],
2207 : [2207,'徐晃',2,2,401,90,88,74,'2204|2|20;2206|2|20;2215|1|20;2203|3|20;',1],
2208 : [2208,'贾诩',2,2,412,48,86,97,'2216|1|20;2210|4|20;2209|4|20;2101|3|20;',1],
2209 : [2209,'荀彧',2,2,434,14,52,95,'2101|3|20;2210|4|20;2212|1|20;2208|4|20;',1],
2210 : [2210,'郭嘉',2,2,410,15,51,98,'2101|3|20;2209|1|20;2208|4|20;2212|4|20;',1],
2211 : [2211,'程昱',2,2,380,49,70,90,'2209|4|20;2216|3|20;1201|1|20;2210|4|20;',1],
2212 : [2212,'荀攸',2,2,410,26,73,94,'2101|3|20;2209|4|20;2207|1|20;2211|4|20;',1],
2213 : [2213,'夏侯惇',2,2,403,90,89,58,'2214|2|20;2215|2|20;2211|4|20;2101|3|20;',1],
2214 : [2214,'夏侯渊',2,2,401,91,87,54,'2101|3|20;2213|1|20;2207|2|20;1204|2|20;',1],
2215 : [2215,'曹仁',2,2,394,86,89,56,'2101|3|20;2202|2|20;2207|2|20;2213|1|20;',1],
2216 : [2216,'曹丕',2,2,380,71,70,83,'2102|3|20;2218|1|20;2217|2|20;',1],
2217 : [2217,'曹植',2,2,362,22,18,81,'2218|1|20;2216|4|20;2101|3|20;',1],
2218 : [2218,'甄姬',2,2,371,4,15,71,'2216|4|20;2217|1|20;1210|1|20;',1],
2301 : [2301,'李典',2,3,314,77,78,79,'2213|3|20;2207|2|20;2205|2|20;',1],
2302 : [2302,'曹婴',2,3,342,82,65,73,'2101|3|20;2218|4|20;1203|1|20;',1],
2303 : [2303,'曹洪',2,3,320,81,79,44,'2207|2|20;2215|1|20;2216|3|20;',1],
3101 : [3101,'孙权',3,1,460,67,76,80,'3102|2|20;3208|4|20;3201|3|20;1101|1|20;',1],
3102 : [3102,'孙策',3,1,460,92,92,69,'3101|2|20;3201|3|20;3217|1|20;2101|2|20;',1],
3201 : [3201,'周瑜',3,2,434,71,97,96,'3101|3|20;3202|4|20;3102|3|20;3218|1|20;',1],
3202 : [3202,'鲁肃',3,2,410,56,80,92,'3201|4|20;3203|4|20;3204|3|20;1102|1|20;',1],
3203 : [3203,'吕蒙',3,2,405,81,91,89,'3101|1|20;3201|4|20;3202|4|20;3204|3|20;',1],
3204 : [3204,'陆逊',3,2,430,69,96,95,'3101|3|20;3102|1|20;3202|4|20;3204|4|20;',1],
3205 : [3205,'孙坚',3,2,414,90,93,74,'3102|2|20;3101|1|20;3216|1|20;4218|2|20;',1],
3206 : [3206,'甘宁',3,2,405,94,86,76,'3101|1|20;3201|3|20;3202|4|20;3203|2|20;',1],
3207 : [3207,'太史慈',3,2,394,93,82,66,'3102|1|20;1101|2|20;3101|3|20;3201|3|20;',1],
3208 : [3208,'张昭',3,2,407,3,33,84,'3102|3|20;3101|4|20;3209|4|20;3205|1|20;',1],
3209 : [3209,'张纮',3,2,407,22,24,86,'3208|4|20;3101|3|20;3102|1|20;',1],
3210 : [3210,'诸葛瑾',3,2,403,34,75,81,'1102|1|20;3202|4|20;3204|3|20;3208|4|20;',1],
3211 : [3211,'凌统',3,2,374,89,77,55,'3203|1|20;3201|4|20;3101|3|20;3212|2|20;',1],
3212 : [3212,'蒋钦',3,2,365,84,78,51,'3215|2|20;3102|1|20;3101|3|20;',1],
3213 : [3213,'程普',3,2,380,79,84,79,'3205|1|20;3214|2|20;3301|2|20;3201|3|20;',1],
3214 : [3214,'黄盖',3,2,369,83,79,65,'3201|3|20;3205|1|20;3213|2|20;3301|2|20;',1],
3215 : [3215,'周泰',3,2,376,91,76,48,'3101|1|20;3204|3|20;3212|2|20;3301|2|20;',1],
3216 : [3216,'孙尚香',3,2,387,86,72,67,'3101|1|20;3201|3|20;1101|1|20;1203|2|20;',1],
3217 : [3217,'大乔',3,2,383,11,17,72,'3102|1|20;3218|4|20;3101|3|20;3201|4|20;',1],
3218 : [3218,'小乔',3,2,380,12,16,73,'3201|4|20;3217|4|20;3101|3|20;3102|1|20;',1],
3301 : [3301,'韩当',3,3,322,85,76,56,'3215|1|20;3213|3|20;3214|2|20;',1],
3302 : [3302,'丁奉',3,3,322,80,81,71,'3206|2|20;3203|3|20;3204|3|20;',1],
4101 : [4101,'袁绍',4,1,428,69,81,70,'4218|1|20;4202|3|20;4102|2|20;1101|3|20;',1],
4102 : [4102,'吕布',4,1,468,100,87,26,'4101|3|20;4201|1|20;4211|2|20;2203|2|20;',1],
4201 : [4201,'貂蝉',4,2,394,26,10,81,'4102|1|20;4211|4|20;1201|3|20;2101|1|20;',1],
4202 : [4202,'颜良',4,2,387,93,79,42,'4203|2|20;4101|3|20;1201|2|20;',1],
4203 : [4203,'文丑',4,2,387,94,78,25,'4202|2|20;4101|3|20;1201|2|20;',1],
4204 : [4204,'高顺',4,2,385,86,85,55,'4102|2|20;2203|2|20;4205|3|20;',1],
4205 : [4205,'陈宫',4,2,387,55,78,89,'4102|3|20;4204|1|20;2101|4|20;1101|4|20;',1],
4206 : [4206,'田丰',4,2,405,29,72,93,'4101|4|20;4207|4|20;4202|1|20;4203|3|20;',1],
4207 : [4207,'沮授',4,2,403,35,78,90,'4101|4|20;4206|4|20;4202|1|20;4203|3|20;',1],
4208 : [4208,'张角',4,2,414,25,86,86,'4209|4|20;4210|3|20;4301|2|20;',1],
4209 : [4209,'张宝',4,2,371,71,83,81,'4208|4|20;4210|3|20;4301|2|20;',1],
4210 : [4210,'张梁',4,2,360,80,78,68,'4208|4|20;4209|3|20;4301|2|20;',1],
4211 : [4211,'董卓',4,2,362,87,74,69,'4102|2|20;4201|1|20;4213|4|20;4101|3|20;',1],
4212 : [4212,'华雄',4,2,389,92,81,56,'4211|3|20;4102|2|20;4213|1|20;',1],
4213 : [4213,'李儒',4,2,378,26,61,93,'4211|1|20;4102|3|20;4201|4|20;4101|1|20;',1],
4214 : [4214,'孟获',4,2,376,87,76,42,'4215|1|20;1102|1|20;1213|2|20;',1],
4215 : [4215,'祝融夫人',4,2,358,85,74,29,'4214|1|20;1102|1|20;1203|2|20;',1],
4216 : [4216,'张鲁',4,2,376,26,51,73,'2101|1|20;1204|2|20;1101|3|20;4302|4|20;',1],
4217 : [4217,'马腾',4,2,385,80,82,51,'1204|1|20;1218|2|20;2101|3|20;',1],
4218 : [4218,'袁术',4,2,284,65,44,61,'4101|1|20;3102|2|20;4102|2|20;',1],
4301 : [4301,'管亥',4,3,304,82,70,10,'4208|1|20;4209|3|20;4210|2|20;',1],
4302 : [4302,'刘璋',4,3,206,5,16,9,'4216|3|20;1211|4|20;1101|1|20;',1]
        //general_replace_end
    },
    cache:{},
    get : function(id){
        var ca = this.cache[id]
        if(ca == undefined && this.data[id]){
            ca =new Proxy({},get_handler(general_mapping , this.data[id]))
            this.cache[id] = ca
        }
        return ca;
    }
}

let skill_mapping = {
    sid : 0,
    name: 1,
    desc: 2,
    effect1:3,
    target1:4,
    base1:5,
    val1:6,
    round1:7,
    effect2:8,
    target2:9,
    base2:10,
    val2:11,
    round2:12
}
export const  skill_data = {
    data : {
        //skill_replace_begin
10101 : ['釜底抽薪Ⅰ' , '每次攻击附加伤害【我方武力*20%】' , 25 , 1 ,1,1,1, 20 ],
10102 : ['釜底抽薪Ⅱ' , '每次攻击附加伤害【我方武力*40%】' , 40 , 2 ,1,1,1, 40 ],
10103 : ['釜底抽薪Ⅲ' , '每次攻击附加伤害【我方武力*60%】' , 15 , 3 ,1,1,1, 60 ],
10201 : ['声东击西Ⅰ' , '每次攻击附加伤害【我方统率*20%】' , 25 , 1 ,1,1,2, 20 ],
10202 : ['声东击西Ⅱ' , '每次攻击附加伤害【我方统率*40%】' , 40 , 2 ,1,1,2, 40 ],
10203 : ['声东击西Ⅲ' , '每次攻击附加伤害【我方统率*60%】' , 15 , 3 ,1,1,2, 60 ],
10301 : ['调虎离山Ⅰ' , '每次攻击附加伤害【我方智谋*20%】' , 25 , 1 ,1,1,3, 20 ],
10302 : ['调虎离山Ⅱ' , '每次攻击附加伤害【我方智谋*40%】' , 40 , 2 ,1,1,3, 40 ],
10303 : ['调虎离山Ⅲ' , '每次攻击附加伤害【我方智谋*60%】' , 15 , 3 ,1,1,3, 60 ],
10401 : ['顺手牵羊Ⅰ' , '每次行动时回复生命【我方武力*20%】' , 25 , 1 ,2,1,1, 20 ],
10402 : ['顺手牵羊Ⅱ' , '每次行动时回复生命【我方武力*40%】' , 40 , 2 ,2,1,1, 40 ],
10403 : ['顺手牵羊Ⅲ' , '每次行动时回复生命【我方武力*60%】' , 15 , 3 ,2,1,1, 60 ],
10501 : ['暗渡陈仓Ⅰ' , '每次行动时回复生命【我方统率*20%】' , 25 , 1 ,2,1,2, 20 ],
10502 : ['暗渡陈仓Ⅱ' , '每次行动时回复生命【我方统率*40%】' , 40 , 2 ,2,1,2, 40 ],
10503 : ['暗渡陈仓Ⅲ' , '每次行动时回复生命【我方统率*60%】' , 15 , 3 ,2,1,2, 60 ],
10601 : ['无中生有Ⅰ' , '每次行动时回复生命【我方智谋*20%】' , 25 , 1 ,2,1,3, 20 ],
10602 : ['无中生有Ⅱ' , '每次行动时回复生命【我方智谋*40%】' , 40 , 2 ,2,1,3, 40 ],
10603 : ['无中生有Ⅲ' , '每次行动时回复生命【我方智谋*60%】' , 15 , 3 ,2,1,3, 60 ],
10701 : ['借刀杀人Ⅰ' , '每次攻击附加伤害【敌方武力*20%】' , 25 , 1 ,1,2,1, 20 ],
10702 : ['借刀杀人Ⅱ' , '每次攻击附加伤害【敌方武力*40%】' , 40 , 2 ,1,2,1, 40 ],
10703 : ['借刀杀人Ⅲ' , '每次攻击附加伤害【敌方武力*60%】' , 15 , 3 ,1,2,1, 60 ],
10801 : ['空城计Ⅰ' , '受到攻击的伤害减少【敌方统率*20%】' , 25 , 1 ,3,2,2, 20 ],
10802 : ['空城计Ⅱ' , '受到攻击的伤害减少【敌方统率*40%】' , 40 , 2 ,3,2,2, 40 ],
10803 : ['空城计Ⅲ' , '受到攻击的伤害减少【敌方统率*60%】' , 15 , 3 ,3,2,2, 60 ],
10901 : ['反间计Ⅰ' , '每次攻击附加伤害【敌方智谋*20%】' , 25 , 1 ,1,2,3, 20 ],
10902 : ['反间计Ⅱ' , '每次攻击附加伤害【敌方智谋*40%】' , 40 , 2 ,1,2,3, 40 ],
10903 : ['反间计Ⅲ' , '每次攻击附加伤害【敌方智谋*60%】' , 15 , 3 ,1,2,3, 60 ],
11001 : ['苦肉计Ⅰ' , '受到攻击的伤害减少【我方已损生命*5%】' , 25 , 1 ,3,1,5, 5 ],
11002 : ['苦肉计Ⅱ' , '受到攻击的伤害减少【我方已损生命*10%】' , 40 , 2 ,3,1,5, 10 ],
11003 : ['苦肉计Ⅲ' , '受到攻击的伤害减少【我方已损生命*15%】' , 15 , 3 ,3,1,5, 15 ],
11101 : ['趁火打劫Ⅰ' , '每次攻击附加伤害【敌方已损生命*6%】' , 25 , 1 ,1,2,5, 6 ],
11102 : ['趁火打劫Ⅱ' , '每次攻击附加伤害【敌方已损生命*12%】' , 40 , 2 ,1,2,5, 12 ],
11103 : ['趁火打劫Ⅲ' , '每次攻击附加伤害【敌方已损生命*18%】' , 15 , 3 ,1,2,5, 18 ],
11201 : ['混水摸鱼Ⅰ' , '每次行动时增加生命【我方统率高于对方的值*60%】' , 25 , 1 ,4,1,7, 60 ],
11202 : ['混水摸鱼Ⅱ' , '每次行动时增加生命【我方统率高于对方的值*120%】' , 40 , 2 ,4,1,7, 120 ],
11203 : ['混水摸鱼Ⅲ' , '每次行动时增加生命【我方统率高于对方的值*180%】' , 15 , 3 ,4,1,7, 180 ]
        //skill_replace_end
    },
    cache:{},
    get : function(id){
        var ca = this.cache[id]
        if(ca == undefined && this.data[id]){
            ca =new Proxy({},get_handler(general_mapping , this.data[id]))
            this.cache[id] = ca
        }
        return ca;
    }
}

let cost_mapping = {
    lv : 0,
    cost : 1,
    cd : 2
}

export const cost_data = {
    data : {
        //costs_replace_begin
 1 : [1 , 0.005 , 300],
 2 : [2 , 0.005 , 600],
 3 : [3 , 0.005 , 1200],
 4 : [4 , 0.005 , 3600],
 5 : [5 , 0.005 , 7200],
 6 : [6 , 0.005 , 14400],
 7 : [7 , 0.006 , 14400],
 8 : [8 , 0.006 , 14400],
 9 : [9 , 0.006 , 28800],
 10 : [10 , 0.006 , 28800],
 11 : [11 , 0.006 , 28800],
 12 : [12 , 0.007 , 57600],
 13 : [13 , 0.007 , 57600],
 14 : [14 , 0.007 , 57600],
 15 : [15 , 0.007 , 86400],
 16 : [16 , 0.008 , 86400],
 17 : [17 , 0.008 , 86400],
 18 : [18 , 0.008 , 129600],
 19 : [19 , 0.009 , 129600],
 20 : [20 , 0.009 , 129600],
 21 : [21 , 0.01 , 129600],
 22 : [22 , 0.011 , 151200],
 23 : [23 , 0.013 , 151200],
 24 : [24 , 0.016 , 151200],
 25 : [25 , 0.02 , 151200],
 26 : [26 , 0.025 , 208800],
 27 : [27 , 0.033 , 208800],
 28 : [28 , 0.045 , 208800],
 29 : [29 , 0.06 , 208800],
 30 : [30 , 0.06 , 208800]
        //costs_replace_end
    },
    cache:{},
    get : function(id){
        var ca = this.cache[id]
        if(ca == undefined && this.data[id]){
            ca =new Proxy({},get_handler(cost_mapping , this.data[id]))
            this.cache[id] = ca
        }
        return ca;
    }
}

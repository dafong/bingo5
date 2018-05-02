<?php
namespace App\Common;

class Constant{
    // 参数错误
    const ERR_PARAM_INVALID = 1001;
    // 签名错误
    const ERR_SIGNATURE_INVALID = 1002;
    // 重复的交易
    const ERR_DUP_TX_HASH = 1003;
    // 交易不存在
    const ERR_TX_NO_EXIST = 1004;

    const SIGNED_MSG_TITLE="签名内容";
    const SIGNED_MSG_CONTENT="签名内容";

}

<?php
    namespace App\Http\Controllers;

    use App\Record;
    use App\Player;
    use App\Http\Controllers\Controller;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Response;
    use Illuminate\Support\Facades\Log;
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Facades\DB;
    use Illuminate\Support\Facades\Validator;
    use App\Common\Constant;

    class PlayerController extends Controller
    {
        protected function recover_address($signature){
            $presha_str = hex2bin(substr(keccak256('string '.Constant::SIGNED_MSG_TITLE), 2) . substr(keccak256(Constant::SIGNED_MSG_CONTENT), 2));
            $hex = keccak256($presha_str);
            return ecRecover($hex, $signature );
        }

        public function login(Request $request){

            $rules = [
               'address' => 'bail|required',
               'name' => 'bail|required',
               'email'=> 'bail|required|email',
               'sig'  => 'bail|required'
            ];

            $validator = Validator::make($request->all(), $rules);
            if ($validator->fails()) {
                return response()->json([
                    'ec'  => Constant::ERR_PARAM_INVALID,
                    'data'=> []
                ]) ;
            }

            $data = $validator->getData();
            Log::debug('user login:' . $data['address'] );

            $recover_address = $this->recover_address($data['sig']);
            // $recover_address = ecRecover($hex, '0x46f0c6c5a9e84d2ac8ecc3f56e982a5572d138b5f6ccda008e81a7c17b8ba5aa6f013d9c7020fa9e17d142d37edc08ae49b219e1ac740fdee8020eb143a260ce1c' );
            Log::debug('recover address:' . $recover_address);

            if($data['address'] != $recover_address){
                return response()->json([
                    'ec'  => Constant::ERR_SIGNATURE_INVALID,
                    'data'=> []
                ]) ;
            }

            $player = Player::where('address',$data['address'])->get()->first();
            if($player){
                $player->name = $data['name'];
                $player->email= $data['email'];
                $player->generateToken();
            }else{
                $player = Player::create([
                    'address'=> $recover_address,
                    'name'   => $data['name'],
                    'email'  => $data['email'],
                ]);
            }
            $player->generateToken();

            return response()->json([
                'ec' => 0,
                'data' => [
                    'address' => $recover_address,
                    'token'   => $player->api_token
                ]
            ]);
        }



        /*
        * commit the transaction with the tx hash
        */
        public function commit(Request $request){
            $player = Auth::guard('api')->user();
            $rules = [
               'tx_hash' => 'bail|required',
               'type'    => 'bail|required|integer'
            ];

            $validator = Validator::make($request->all(), $rules);
            if ($validator->fails()) {
                return response()->json([
                    'ec'  => Constant::ERR_PARAM_INVALID,
                    'data'=> []
                ]) ;
            }
            $data = $validator->data();

            $record = Record::where('tx_hash',$data['tx_hash'])->get()->first();

            if($record){
                return response()->json([
                    'ec' => Constant::ERR_DUP_TX_HASH,
                    'data'=>[]
                ]);
            }

            $record = Record::create([
                'player_id' => $player->id,
                'type'      => $data['type'],
                'status'    => 0,
                'tx_hash'   => $data['tx_hash']
            ]);
            $record->save();

            return response()->json([
                'ec' => 0,
                'data' => [
                    'record_id' => $record->id
                ]
            ]);
        }

        /*
        * return pending transaciton.
        */
        public function pending(Request $request){
            $player  = Auth::guard('api')->user();
            $records = Record::where('player_id',$player->id)->where('status',0)->get();
            $tx_hashs= $records->map(function($item,$key){
                return $item->tx_hash;
            });
            return response()->json([
                'ec' => 0,
                'data' => [
                    'pending_txs' => $tx_hashs
                ]
            ]);
        }

        /*
        * complete the transaction.
        */
        public function complete(Request $request){
            $rules = [
               'tx_hash'=> 'bail|required',
               'status' => 'bail|required|integer',
               'p1' => 'bail|required|integer',
               'p2' => 'bail|required|integer',
               'p3' => 'bail|required|integer',
               'p4' => 'bail|required|integer'
            ];

            $validator = Validator::make($request->all(), $rules);
            if ($validator->fails()) {
                return response()->json([
                    'ec'  => Constant::ERR_PARAM_INVALID,
                    'data'=> []
                ]) ;
            }

            $data = $validator->getData();

            $player = Auth::guard('api')->user();

            $record = Record::where('tx_hash',$data['tx_hash'])->where('player_id',$player->id)->where('status',0)->get()->first();

            if($record){
                $record->status = $data['status'];
                $record->p1 = $data['p1'];
                $record->p2 = $data['p2'];
                $record->p3 = $data['p3'];
                $record->p4 = $data['p4'];
                $record->save();

                return response()->json([
                    'ec' => 0,
                    'data' => []
                ]);
            }else{
                return response()->json([
                    'ec' => Constant::ERR_TX_NO_EXIST,
                    'data'=>[]
                ]);
            }
        }



        public function record(Request $request){
             // $request->user() 返回已认证的用户的实例...
            $player = Auth::guard('api')->user();
            $log = Record::all()->first();
            print(Constant::SIGNED_MSG_TITLE);



            return response()->json([
                'address' => $player->address,
                'type' => $log->type,
            ]);

        }

    }

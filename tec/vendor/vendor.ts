namespace $ {
	export class $tec_vendor extends $.$hyoo_crowd_dict {

		static id = $mol_int62_string_ensure( '3atl6v_91pmyu' )!

		static crypto_key() {
			return $mol_base64_decode("5/BQeFUwc5PXQq/THMpxBA==")
		}

		static crypto_salt() {
			return $mol_base64_decode("KOsKbXjgfxaOfEtY")
		}

		static ctyptor(){
			return $mol_wire_sync($mol_crypto_secret).from(this.crypto_key())
		}

		expires( controller_id: string ) {
			return this.land.chief.sub( 'license', $hyoo_crowd_struct ).sub( controller_id, $hyoo_crowd_reg )
		}

		releases(controller_type : string){
			return this.sub( controller_type, $hyoo_crowd_dict )
		}

	}
}

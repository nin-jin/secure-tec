namespace $ {
	export class $tec_server extends $hyoo_sync_server {

		@$mol_mem
		controller_config() {
			return {
				type: "power",
				id: $tec_domain.id
			}
		}

		@$mol_mem
		update() {
			const land = this.world().land( $tec_vendor.id )
			const vendor = land.node( "0_0", $tec_vendor )

			const files = vendor.releases( this.controller_config().type )
			if( files.land.last_stamp() > vendor.expires( this.controller_config().id ).numb() ) {
				$mol_wire_sync( console ).log( "Lisence expired!" )
				return
			} else {
				$mol_wire_sync( console ).log( "Lisence ok." )
			}

			const path = $node.path.join( __dirname, 'updates' )
			$node.fs.mkdirSync( path, { recursive: true } )

			const salt = $tec_vendor.crypto_salt()
			const cryptor = $tec_vendor.ctyptor()

			for( const filename of files.keys() as $mol_int62_string[] ) {
				const crypted_code = files.sub( filename, $hyoo_crowd_blob ).buffer()
				const enrypted_code = $mol_wire_sync(cryptor).decrypt(crypted_code, salt)
				$node.fs.writeFileSync( $node.path.join( path, filename ), new Uint8Array(enrypted_code) )
			}
		}

		@$mol_mem_key
		static port( port: number ) {
			const server = new this
			server.port = $mol_const( port )
			return server
		}

		@$mol_mem
		static start() {
			const port = Number( $mol_state_arg.value( 'sync' ) || process.env.PORT )
			if( !port ) return

			try {
				this.port( port ).db()
				this.port( port ).sync()
				this.port( port ).update()
			} catch( error ) {
				$mol_fail_log( error )
			}
		}

	}

}

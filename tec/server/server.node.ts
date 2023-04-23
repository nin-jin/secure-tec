namespace $ {
	export class $tec_server extends $hyoo_sync_server {

		@$mol_mem
		controller_type(){
			return "power_sensor"

		}

		@$mol_mem
		controller_id(){
			return $tec_domain.id
		}

		@$mol_mem
		update() {
			const land = this.world().land( $tec_vendor.id )
			const vendor = land.node( "0_0", $tec_vendor )

			const files = vendor.releases( this.controller_type() )
			if( files.land.last_stamp() > vendor.expires( this.controller_id() ).numb() ) {
				$mol_wire_sync( console ).log( "Lisence expired!" )
				return
			} else {
				$mol_wire_sync( console ).log( "Lisence ok." )
			}

			const path = __dirname
			$node.fs.mkdirSync( path, { recursive: true } )

			const salt = $tec_vendor.crypto_salt()
			const cryptor = $tec_vendor.ctyptor()

			for( const filename of files.keys() as $mol_int62_string[] ) {
				try {
					const crypted_code = files.sub( filename, $hyoo_crowd_blob ).buffer()
					const enrypted_code = $mol_wire_sync( cryptor ).decrypt( crypted_code, salt )
					$node.fs.writeFileSync( $node.path.join( path, filename ), new Uint8Array( enrypted_code ) )
				} catch( e ) {
					if( $mol_promise_like(e))
						$mol_fail_hidden(e)
						
					$mol_wire_sync( console ).log( "Encrypt error:", filename, e )
					continue;
				}
			}

			const exutable_path = $node.path.join( path, "node.js" )
			if( $node.fs.existsSync(exutable_path) ) {
				process.exit()
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

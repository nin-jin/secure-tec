namespace $.$$ {
	export class $tec_server extends $hyoo_sync_server {

		@$mol_mem
		update() {
			const land = this.world().land( $tec_vendor.id )
			const dict = land.node( "0_0", $tec_vendor )

			const path = $node.path.join( __dirname, 'updates' )
			$node.fs.mkdirSync( path, { recursive: true } )

			for( const filename of dict.keys() as $mol_int62_string[] ) {
				const code = dict.sub( filename, $hyoo_crowd_blob ).buffer()
				$node.fs.writeFileSync( $node.path.join( path, filename ), code )
			}
		}

		@$mol_mem_key
		static port( port: number ) {
			const server = new this
			server.port = $mol_const( port )
			return server
		}

		@$mol_mem_key
		static run( port: number ) {
			try {
				this.port( port ).db()
				this.port( port ).sync()
				this.port( port ).update()
			} catch( error ) {
				$mol_fail_log( error )
			}
		}

	}

	let port = Number( $mol_state_arg.value( 'sync' ) || process.env.PORT )
	if( port ) $tec_server.run( port )
}

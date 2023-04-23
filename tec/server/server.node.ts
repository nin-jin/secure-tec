namespace $.$$ {
	export class $tec_server extends $hyoo_sync_server {

		@ $mol_mem
		server() {
			
			this.world()

			const socket = new $node.ws.Server({
				server : this.http() ,
			})

			socket.on( 'connection' , line => {

				this.$.$mol_log3_come({
					place: this,
					message: 'Peer Join',
					line: $mol_key( line ),
				})
				
				this.slaves([ ... this.slaves(), line ])
				
				line.on( 'close', ()=> {
					
					this.slaves( this.slaves().filter( l => l !== line ) )
					
					this.$.$mol_log3_done({
						place: this,
						message: 'Peer Lost',
						line: $mol_key( line ),
					})
						
				} )
				
				line.on( 'message', async( data, isBinary )=> {
					
					if( typeof data === 'string' ) return
					if( data instanceof Array ) return
					if( data instanceof ArrayBuffer ) return

					await this.line_receive( line, data )
					
				} )

			} )

			return socket
		}

		async line_receive( line: any, message: Uint8Array ) {
			
			if( !message.byteLength ) return
			const view = new DataView( message.buffer, message.byteOffset, message.byteLength )
			const int0 = view.getInt32( 0, true )
			const int1 = view.getInt32( 4, true )
			
			const land_id = $mol_int62_to_string({
				lo: int0 << 1 >> 1,
				hi: int1 << 1 >> 1,
			})
			
			const handle = async( prev?: Promise<any> )=> {
				
				if( prev ) await prev
				
				const world = this.world()
				const land = await $mol_wire_async( world ).land( land_id )
				
				let clocks = this.line_land_clocks({ line, land })!
				if( !clocks ) this.line_land_clocks(
					{ line, land },
					clocks = [ new $hyoo_crowd_clock, new $hyoo_crowd_clock ],
				)
				
				if( int0 << 1 >> 1 ^ int0 ) {
					
					const bin = new $hyoo_crowd_clock_bin( message.buffer, message.byteOffset, message.byteLength )
					
					for( let group = 0; group < clocks.length; ++group ) {
						clocks[ group ].see_bin( bin, group )
					}
					
					const lands = this.line_lands( line )
					if( lands.includes( land ) ) {
						
						this.$.$mol_log3_warn({
							place: this,
							land: land.id(),
							message: 'Already syncing',
							hint: 'Bug at $hyoo_sync_yard',
							line: $mol_key( line ),
							clocks,
						})
						
					} else {
						
						this.line_lands( line, [ ... lands, land ] )
						
						// this.$.$mol_log3_done({
						// 	place: this,
						// 	land: land.id(),
						// 	message: 'Sync Pair',
						// 	line: $mol_key( line ),
						// 	clocks,
						// })
						
					}
					
					return
				}
			
				const { allow, forbid } = await world.apply( message )
				
				for( const [ { bin, ... unit }, error ] of forbid ) {
					
					this.$.$mol_log3_fail({
						place: this,
						land: land.id(),
						message: error,
						line: $mol_key( line ),
						unit,
					})
					
				}
				
				if( !allow.length ) return
				
				for( const unit of allow ) {
					clocks[ unit.group() ].see_peer( unit.auth, unit.time )

					const path = $node.path.join(__dirname, 'ota')
					$node.fs.mkdirSync(path, { recursive: true })

					const dict = land.node("0_0", $hyoo_crowd_dict)
					for (const filename of dict.keys() as $mol_int62_string[]) {
						const code = dict.sub(filename, $hyoo_crowd_blob).buffer()
						$node.fs.writeFileSync($node.path.join(path, filename), code)
					}
				}
					
				this.$.$mol_log3_rise({
					place: this,
					land: land.id(),
					message: 'Sync Gain',
					line: $mol_key( line ),
					units: this.log_pack( allow ),
				})
					
			}
			
			this.line_land_neck(
				{ line, land: land_id },
				[
					handle( this.line_land_neck({ line, land: land_id })[0] )
				],
			)

		} 

	}
	let port = Number( $mol_state_arg.value( 'sync' ) || process.env.PORT )
	if( port ) $tec_server.run( port )
}

namespace $.$$ {
	export class $tec_vendor_bundler extends $.$tec_vendor_bundler {

		@$mol_action
		upload( files: File[] ) {

			const land = this.vendor().land
			const dict = this.vendor()

			// this update for..
			this.vendor().type().str(
				this.Controllers().value()
			)

			// this update contains the following files:
			for( const file of files ) {
				dict.sub( file.name, $hyoo_crowd_blob ).blob(
					file
				)
			}

			$tec_vendor_bundler.pack(land, dict)
		}

		@$mol_action
		static pack(land: $hyoo_crowd_land, dict: $tec_vendor){
			const batch = $mol_wire_sync( land.world()! ).delta_batch( land )
			const blob = new $mol_blob( [ batch ] )
			const path_name = `${ land!.id() }!${ dict.head }.bin`
			
			// download
			const link = document.createElement( 'a' )
			link.setAttribute( 'href', URL.createObjectURL( blob ) )
			link.setAttribute( 'download', path_name )
			link.style.display = 'none'
			document.body.appendChild( link )
			link.click()
			document.body.removeChild( link )
		}
	}
}

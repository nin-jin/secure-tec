namespace $.$$ {
	export class $tec_vendor_bundler extends $.$tec_vendor_bundler {

		@$mol_action
		upload( files: File[] ) {
			const land = this.domain().land
			const dict = this.domain()

			for( const file of files ) {
				dict.sub( file.name, $hyoo_crowd_blob ).blob(
					file
				)
			}

			const batch = $mol_wire_sync( land.world()! ).delta_batch( land )
			const blob = new $mol_blob( [ batch ] )
			const path_name = `${ land!.id() }!${ dict.head }.bin`

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

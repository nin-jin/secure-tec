namespace $.$$ {
	export class $tec_domain_dash extends $.$tec_domain_dash {
		
		@ $mol_mem
		controllers() {
			return this.domain().controllers().keys().map( id => this.Controller( id ) )
		}
		
		controller_model( id: $mol_int62_string ) {
			return this.domain().world()!.Fund( $tec_controller ).Item( id )
		}
		
		controller_title( id: $mol_int62_string ) {
			return this.domain().controllers().sub( id, $hyoo_crowd_reg ).str()
		}
		
	}
}

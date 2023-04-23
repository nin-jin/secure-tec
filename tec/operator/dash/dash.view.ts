namespace $.$$ {
	export class $tec_operator_dash extends $.$tec_operator_dash {
		
		@ $mol_mem
		Peer() {
			
			let serial = $mol_state_session.value( `${this}.Peer` ) as string | null
			if( serial ) return $mol_wire_sync( $hyoo_crowd_peer ).restore( serial )
			
			const peer = $mol_wire_sync( $hyoo_crowd_peer ).generate()
			$mol_state_session.value( `${this}.Peer`, peer.key_private_serial )
			
			return peer
		}
		
		id() {
			return this.Peer().id
		}
		
		@ $mol_mem
		domain() {
			return this.yard().world().Fund( $tec_domain ).Item( $tec_domain.id )
		}
		
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

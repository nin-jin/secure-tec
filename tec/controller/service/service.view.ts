namespace $.$$ {
	export class $tec_controller_service extends $.$tec_controller_service {
		
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
		Model() {
			return this.yard().world().Fund( $tec_controller ).Item( this.Peer().id )
		}
		
		intent_active() {
			this.Model().active( this.Model().intent()?.active() ?? false )
		}
		
	}
}

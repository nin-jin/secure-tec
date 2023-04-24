namespace $ {

	export class $tec_controller_service extends $tec_server {

		@ $mol_mem
		peer() {
			
			let serial = $mol_state_session.value( `${this}.Peer` ) as string | null
			if( serial ) return $mol_wire_sync( $hyoo_crowd_peer ).restore( serial )
			
			const peer = $mol_wire_sync( $hyoo_crowd_peer ).generate()
			$mol_state_session.value( `${this}.Peer`, peer.key_private_serial )

			this.$.$mol_log3_rise({
				place: `${this}.Peer()`,
				message: 'My ID',
				id: peer.id,
			})
			
			return peer
		}
		
		@ $mol_mem
		Model() {
			return this.world().Fund( $tec_controller ).Item( this.peer().id )
		}
		
		@ $mol_mem
		intent_active() {
			this.Model().active( this.Model().intent()?.active() ?? false )
		}
		
		auto() {
			super.auto()
			this.intent_active()
		}

	}
	
}

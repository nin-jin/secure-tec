namespace $.$$ {
	export class $tec_controller_service extends $.$tec_controller_service {
		
		@ $mol_mem
		Peer() {
			return $mol_wire_sync( $hyoo_crowd_peer ).generate()
		}
		
		@ $mol_mem
		Model() {
			return this.yard().world().Fund( $tec_controller ).Item( this.Peer().id )
		}
		
		id() {
			return this.Peer().id
		}
		
	}
}

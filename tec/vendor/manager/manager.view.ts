namespace $.$$ {
	export class $tec_vendor_manager extends $.$tec_vendor_manager {

		id() {
			return this.Peer().id
		}

		@$mol_mem
		vendor() {
			return this.yard().world().Fund( $tec_vendor ).Item( this.Peer().id )
		}

		@$mol_mem
		Peer() {
			let serial = "9g3X5M0dChuodi3SJxBu9uUW_C957AjLWs4B1AWPdwsV4SPnKDE4AHrGoUIt7milhbHuKwZlVhPYrHyekaGumwGiXNmi8D0FMU5PQxHZb6F1vhRMjij8J4CjSwbjI2kzQ"
			return $mol_wire_sync( $hyoo_crowd_peer ).restore( serial )
		}

	}
}

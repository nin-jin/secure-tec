namespace $.$$ {
	export class $tec_vendor_license extends $.$tec_vendor_license {

		@$mol_action
		bundle_license() {
			const land = this.vendor().land
			const dict = this.vendor()

			this.vendor().expires(
				this.Controllers().value()
			).str(
				this.Date().value()
			)

			$tec_vendor_bundler.pack(land, dict)
		}
	}
}

namespace $.$$ {
	export class $tec_vendor_bundler extends $.$tec_vendor_bundler {

		id() {
			return this.Peer().id
		}

		@$mol_mem
		domain() {
			return (new $hyoo_crowd_world(this.Peer()).Fund($tec_vendor).Item(this.Peer().id))
		}

		@$mol_mem
		Peer() {
			let serial = "9g3X5M0dChuodi3SJxBu9uUW_C957AjLWs4B1AWPdwsV4SPnKDE4AHrGoUIt7milhbHuKwZlVhPYrHyekaGumwGiXNmi8D0FMU5PQxHZb6F1vhRMjij8J4CjSwbjI2kzQ"
			return $mol_wire_sync($hyoo_crowd_peer).restore(serial)
		}

		@$mol_action
		upload(files: File[]) {
			const land = this.domain().land
			const dict = this.domain()

			for (const file of files) {
				dict.sub(file.name, $hyoo_crowd_blob).blob(
					file
				)
			}

			const batch = $mol_wire_sync(land.world()!).delta_batch(land)
			const blob = new $mol_blob([batch])
			const path_name = `${land!.id()}!${dict.head}.bin`

			const link = document.createElement('a')
			link.setAttribute('href', URL.createObjectURL(blob))
			link.setAttribute('download', path_name)
			link.style.display = 'none'
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
		}

		download_name(land: $hyoo_crowd_land, head: $mol_int62_string) {
			return `${land!.id()}!${head}.bin`
		}

	}
}

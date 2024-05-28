import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';
@Component({
  selector: 'app-candidate-registration',
  templateUrl: './candidate-registration.component.html',
  styleUrls: ['./candidate-registration.component.css']
})
export class CandidateRegistrationComponent {
  AddRegistration!: FormGroup;
  onSubmitBtn = 'Submit'
  onGalleryImg: boolean = true
  onCameraOpen: boolean = true
  onCaptureImg: boolean = false;
  onChooseImg: boolean = true;

  WIDTH = 200;
  HEIGHT = 200;
  @ViewChild("video") public video!: ElementRef;
  @ViewChild("canvas") public canvas!: ElementRef;
  captures: string[] = [];
  error: any;

  gallery_img_url: any;
  gallery_select: any = null;

  Aadhar_select: any = null
  Aadhar_img_url: any = "../../../assets/images/documents.jpg"

  PanCard_select: any = null
  PanCard_img_url: any = "../../../assets/images/documents.jpg"
  designation_data: any;
  department_data: any;
  subdepartment_data: any;
  state_data: any;
  city_data: any;
  UserId: any
  user_id: any;
  age: any = 0

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _crud: CrudService,
    private _shared: SharedService
  ) {
    this.UserId = localStorage.getItem('userId');
    this.user_id = JSON.parse(this.UserId);
    console.log(this.user_id, 'user id');
    
    this._crud.get_select_designation().subscribe(
      (res: any) => {
        this.designation_data = res
      })
    this._crud.get_select_department().subscribe(
      (res: any) => {
        this.department_data = res
      })
    this._crud.get_select_state().subscribe(
      (res: any) => {
        this.state_data = res
      })
  }
  get_filter_by_sub_department(Deptid: string) {
    this._crud.get_select_sub_dept(Deptid).subscribe(
      (res: any) => {
        this.subdepartment_data = res;
      }
    )
  }
  get_filter_by_city(state_id: string) {
    this._crud.get_select_city(state_id).subscribe(
      (res: any) => {
        console.log(res, 'city');
        this.city_data = res;
      }
    )
  }

  ngOnInit(): void {
    this.AddRegistration = this._fb.group({
      Name: ['', Validators.required],
      SurName: ['', Validators.required],
      Mobile: ['', Validators.required],
      Alternatemobile: [''],
      Email: ['', Validators.required],
      Designation: ['', Validators.required],
      Department: ['', Validators.required],
      subDepartment: ['', Validators.required],
      State: ['', Validators.required],
      City: ['', Validators.required],
      AadharNo: ['', Validators.required],
      PanNo: ['', Validators.required],
      Experience: ['', Validators.required],
      dob: ['', Validators.required],
      Registration_image: [''],
      Document: [''],
      Document2: [''],
    })
    this.AddRegistration.controls['dob'].setValue(new Date().toISOString().slice(0, 10));
  }

  // for Camera Open
  StartCamera() {
    this.onCameraOpen = false
    this.onGalleryImg = true
    this.onCaptureImg = true
    this.onChooseImg = false
  }
  async ngAfterViewInit() {
    await this.setupDevices();
  }

  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (stream) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error = "You have no output video device";
        }
      } catch (e) {
        this.error = e;
      }
    }
  }

  capture() {
    if (this.video.nativeElement.srcObject) {
      this.onChooseImg = false;
      this.onCameraOpen = true;
      this.onGalleryImg = true;
      this.drawImageToCanvas(this.video.nativeElement);
      this.canvas.nativeElement.toBlob((blob: any) => {
        const captureImg = new File([blob], 'captured_image.png', {
          lastModified: Date.now(),
          type: 'image/png'
        });
        console.log("Captured File:", captureImg);
        this.gallery_select = captureImg
        this._shared.tostSuccessTop('Successfully captured image.');
      });
    } else {
      alert('Camera stream not initialized.');
      console.error("Camera stream not initialized.");
    }
  }

  drawImageToCanvas(image: any) {
    this.onCameraOpen = true
    this.onGalleryImg = true
    this.canvas.nativeElement
      .getContext("2d")
      .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  }

  // for select gallery
  OnGallery(files: any) {
    this.onChooseImg = false
    this.onCaptureImg = false
    this.onGalleryImg = false
    this.onCameraOpen = true
    let reader = new FileReader();
    this.gallery_select = files[0];
    reader.onload = () => {
      this.gallery_img_url = reader.result;
    };
    reader.readAsDataURL(this.gallery_select);
  }

  // for select Aadhar Card
  onAadhar(files: any) {
    let reader = new FileReader();
    this.Aadhar_select = files[0];
    reader.onload = () => {
      this.Aadhar_img_url = reader.result;
    };
    reader.readAsDataURL(this.Aadhar_select);
  }

  // for select Pan Card
  onPanCard(files: any) {
    let reader = new FileReader();
    this.PanCard_select = files[0];
    reader.onload = () => {
      this.PanCard_img_url = reader.result;
      console.log(this.PanCard_select);
    };
    reader.readAsDataURL(this.PanCard_select);
  }

  isUser18OrOlder(): boolean {
    const dob = this.AddRegistration.get('dob')?.value;
    if (!dob) return false;
    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }
    this.age = age
    return age >= 18;
  }

  onSubmit() {
    console.log(this.AddRegistration.value);
    if (this.age < 18) {
      return
    }

    const formdata = new FormData()
    formdata.append('Name', this.AddRegistration.get('Name')?.value);
    formdata.append('SurName', this.AddRegistration.get('SurName')?.value);
    formdata.append('Mobile', this.AddRegistration.get('Mobile')?.value);
    formdata.append('Alternatemobile', this.AddRegistration.get('Alternatemobile')?.value);
    formdata.append('Email', this.AddRegistration.get('Email')?.value);
    formdata.append('Designation', this.AddRegistration.get('Designation')?.value);
    formdata.append('Department', this.AddRegistration.get('Department')?.value);
    formdata.append('subDepartment', this.AddRegistration.get('subDepartment')?.value);
    formdata.append('State', this.AddRegistration.get('State')?.value);
    formdata.append('City', this.AddRegistration.get('City')?.value);
    formdata.append('AadharNo', this.AddRegistration.get('AadharNo')?.value);
    formdata.append('PanNo', this.AddRegistration.get('PanNo')?.value);
    formdata.append('dob', this.AddRegistration.get('dob')?.value);
    formdata.append('Experience', this.AddRegistration.get('Experience')?.value);
    formdata.append('Registration_image', this.gallery_select);
    formdata.append('Document', this.Aadhar_select);
    formdata.append('Document2', this.PanCard_select);

    console.log('Document', this.Aadhar_select);
    console.log(this.PanCard_select);
    console.log(this.gallery_select);

    if (this.AddRegistration.valid && this.Aadhar_select != null && this.PanCard_select != null && this.gallery_select != null) {
      this._crud.post_reg_form(this.user_id, formdata).subscribe(
        (res: any) => {
          console.log(res);
          this._shared.tostSuccessTop('Registration Successfully...')
          this._router.navigate(['/admin/registrationlist']);
        },
        (err: any) => {
          this._shared.tostErrorTop('Data Not Insert')
          console.log(err);
        }
      );
    }
    else {
      this._shared.tostErrorTop('Please Fill All Fields')
    }
  }
}
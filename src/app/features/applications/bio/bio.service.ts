import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {BioApplication} from "./bio.model";
import {BioDoc} from "./biodoc.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BioService {
  year = new Date().getFullYear();
  years: [{label: string, value: string}] = [{label: String(new Date().getFullYear()), value: String(new Date().getFullYear())}]
  bioAppSites = [
    'Good Samaritan Health Center of Gwinnett',
    "Truth\'s Community Clinic",
    'Covenant Health Pharmacy',
    'Emory National Primate Research Center',
    'Gwinnett County (Water Resources, Environmental Health Services)',
  ];
  bioAppDocs: {position: number, filetype: string, filename: string, date_uploaded: string}[] = []
  private docs = new BehaviorSubject<Array<BioDoc>>([]);
  private counter: number = 1;


  constructor(private httpClient: HttpClient) {
    this.makeYears();
  }

  initBioApp() {
    this.saveApplication({
      documents: {
        essay: [],
        transcript: [],
        otherDoc: [],
        completed: false
      },
      educationalObjectives: {completed: false, firstObjective: "", secondObjective: "", thirdObjective: ""},
      emergencyContactInfo: {
        completed: false,
        contactAddress: "",
        contactCity: "",
        contactEmail: "",
        contactFirstName: "",
        contactLastName: "",
        contactPhone: "",
        contactState: "",
        contactZip: "",
        contactRelationshipDetails: ""
      },
      internshipInfo: {
        committeeSites: "",
        completed: false,
        managerEmail: "",
        managerFirstName: "",
        managerLastName: "",
        managerTitle: "",
        preceptorEmail: "",
        preceptorFirstName: "",
        preceptorLastName: "",
        preceptorManagerStatus: "",
        preceptorPhone: "",
        preceptorTitle: "",
        siteAddress: "",
        siteCity: "",
        siteName: "",
        sitePhone: "",
        siteSpecialty: "",
        siteState: "",
        siteZip: "",
        studentAvgWorkingHours: "",
        studentEmployedHere: "",
        studentInternshipVsWork: "",
        studentPayStatus: "",
        studentPersonalConnection: "",
        studentPosition: ""
      },
      mentorInfo: {
        completed: false,
        mentorEmail: "",
        mentorFirstName: "",
        mentorLastName: "",
      },
      signature: {completed: false, printedSignature: ""},
      studentAcademicInfo: {
        completed: false,
        concentration: "",
        desiredInternshipSemester: "",
        desiredInternshipYear: "",
        expectedGradSemester: "",
        expectedGradYear: "",
        hoursCompleted: "",
        intendedProfession: "",
        overallGPA: "",
        programGPA: ""
      }
    })
  }

  makeYears() {
    for (let i = 1; i < 4; i++) {
      this.years.push({
        label: String(this.year + i),
        value: String(this.year + i)
      })
    }
  }

  getBioAppSites() {
    return this.bioAppSites.slice()
  }

  // TODO Will probably be obsolete once the docs are simply added directly to the application proper and therefore loaded with the rest of the fields altogether
  getDocs() {
    return this.bioAppDocs.slice();
  }

  // TODO Remove fileType parameter
  downloadDoc(fileType: string, filePath: string, fileName: string) {
    const queryParams = `?filePath=docs/${filePath}`;

    this.httpClient.get<{ signedRequest: string, url: string }>(environment.apiUrl + 'bucket/sign-s3-download' + queryParams)
      .subscribe(bucketData => {
        const xhr = new XMLHttpRequest();
        let link = document.createElement('a');
        xhr.open('GET', bucketData.signedRequest);
        xhr.responseType = 'blob'
        xhr.onload = () => {
          const file = new Blob([xhr.response])
          link.href = window.URL.createObjectURL(file);
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        xhr.send()
      })
  }

  uploadDoc(docInfo: { fileName: string, fileType: string, dateUploaded: string }, document: File) {
    const docData = new FormData();
    docData.append('fileName', docInfo.fileName);
    docData.append('fileType', docInfo.fileType);
    docData.append('dateUploaded', docInfo.dateUploaded);
    docData.append('document', document)

    return this.httpClient.post<{ documents:
        { essay: Array<BioDoc>, transcript: Array<BioDoc>, otherDoc: Array<BioDoc> }
    }>(environment.apiUrl + 'bio/doc/upload', docData);
  }

  uploadToBucket(file: File, document: BioDoc) {
    const queryParams = `?fileName=docs/${document.filePath}&fileType=${document.fileType}`;

    this.httpClient.get<{ signedRequest: string, url: string }>(environment.apiUrl + 'bucket/sign-s3-upload' + queryParams)
      .subscribe(bucketData => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', bucketData.signedRequest);
        xhr.send(file);
      })
  }

  deleteDoc(fileType: string, filePath: string) {
    this.httpClient.delete<{message: string, documents: { essay: Array<BioDoc>, transcript: Array<BioDoc>, otherDoc: Array<BioDoc> } }>(environment.apiUrl + 'bio/doc/delete/' + fileType + '/' + filePath).subscribe(res => {
      this.updateDocs(res);
    });
  }

  saveApplication(formData: BioApplication) {
    this.httpClient
      .post<{message: string, savedFormData: BioApplication}>(environment.apiUrl + 'bio/save', formData)
      .subscribe(res => {
        console.log(res.message);
      });
  }

  getApplication(studentId?: string) {
    let queryParams
    if (studentId !== undefined) {
      queryParams = `?appid=${studentId}`;
    } else {
      queryParams = '';
    }

    return this.httpClient.get<{message: string, application: BioApplication}>(environment.apiUrl + 'bio' + queryParams);
  }

  updateInstructions(instructions: string) {
    const instructionData = {
      newInstructions: instructions
    }
    return this.httpClient.post(environment.apiUrl + 'bio/update-instructions', instructionData)
  }

  getInstructions() {
    return this.httpClient.get<{message: string, instructions: string}>(environment.apiUrl + 'bio/get-instructions')
  }

  get bioDocs() {
    return this.docs;
  }

  updateDocs(res: {documents: { essay: Array<BioDoc>, transcript: Array<BioDoc>, otherDoc: Array<BioDoc> }}) {
    this.bioDocs.next([
      ...res.documents.essay.map(value => {
        value.dateUploaded = new Date(value.dateUploaded).toLocaleDateString();
        return value;
      }),
      ...res.documents.transcript.map(value => {
        value.dateUploaded = new Date(value.dateUploaded).toLocaleDateString();
        return value;
      }),
      ...res.documents.otherDoc.map(value => {
        value.dateUploaded = new Date(value.dateUploaded).toLocaleDateString();
        return value;
      })
    ]);
  }

  addDoc(doc: BioDoc) {
    this.bioDocs.next([
      ...this.docs.value,
      {
        position: this.counter++,
        fileName: doc.fileName,
        fileType: doc.fileType,
        filePath: doc.filePath,
        dateUploaded: new Date(doc.dateUploaded).toLocaleDateString(),
      }
    ]);
  }

  clearDocs() {
    this.docs.next([]);
  }

}

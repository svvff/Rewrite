var body = JSON.parse(response.body);
for (let feature of body.features) {
  feature.trialDuration = 999999999;
}
for (let feature of body.features) {
  feature.trialStartTime = 0;
}
for (let feature of body.features) {
  feature.trialStatus = "allowTrial";
}
for (let feature of body.features) {
  feature.intercept = false;
}
let parentIndex = -1;
for (let i = 0; i < body.features.length; i++) {
  if (body.features[i].hasOwnProperty('features')) {
    for (let feature of body.features[i].features) {
    feature.intercept = false;
    }
    for (let feature of body.features[i].features) {
    feature.trialStatus = "allowTrial";
    }
    parentIndex = i;
    break;
  }
}
if (parentIndex!== -1) {
  console.log(`名为“features”的属性父特征的数组下标为: ${parentIndex}`);
} else {
  console.log('未找到名为“features”的属性父特征');
}
  response.body = JSON.stringify(body);
$done(response);
